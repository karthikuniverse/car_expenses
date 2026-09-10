import { Request, Response, NextFunction } from 'express';
import Trip from '../models/Trip';

// @desc    Search and autocomplete places using OpenStreetMap Photon API
// @route   GET /api/trips/places-autocomplete
// @access  Public
export const autocompletePlaces = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = (req.query.q as string)?.trim();

    if (!query || query.length < 2) {
      res.status(200).json({
        success: true,
        count: 0,
        data: [],
      });
      return;
    }

    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=10`;

    const response = await fetch(photonUrl, {
      headers: {
        'User-Agent': 'CarExpensesApp/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Photon geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();

    const places = (data.features || []).map((feature: any) => {
      const p = feature.properties || {};
      const name = p.name || '';
      const street = p.street ? `${p.housenumber ? p.housenumber + ' ' : ''}${p.street}` : '';
      const city = p.city || p.town || p.village || '';
      const district = p.district || p.county || '';
      const state = p.state || '';
      const country = p.country || '';
      const postcode = p.postcode || '';

      // Create a clean readable address line without duplicate names
      const parts = [
        name,
        street && street !== name ? street : '',
        city && city !== name ? city : '',
        district && district !== city ? district : '',
        state,
        country,
      ].filter(Boolean);

      const formattedLabel = parts.join(', ');

      return {
        label: formattedLabel,
        value: formattedLabel,
        name: name,
        city: city,
        district: district,
        state: state,
        country: country,
        postcode: postcode,
        coordinates: feature.geometry?.coordinates || [], // [longitude, latitude]
      };
    });

    res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
export const getTrips = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search, from_date, to_date } = req.query;
    const filterQuery: any = {};

    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      filterQuery.$or = [
        { customer_name: searchRegex },
        { phone_number: searchRegex },
        { from: searchRegex },
        { to: searchRegex },
      ];
    }

    if (from_date || to_date) {
      filterQuery.date = {};
      if (from_date) filterQuery.date.$gte = new Date(from_date as string);
      if (to_date) filterQuery.date.$lte = new Date(to_date as string);
    }

    const trips = await Trip.find(filterQuery).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single trip by ID
// @route   GET /api/trips/:id
// @access  Public
export const getTripById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      res.status(404).json({
        success: false,
        error: 'Trip not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Public
export const createTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      from,
      to,
      date,
      fuel_amount,
      liters,
      toll,
      toll_amount,
      phone_number,
      customer_name,
      trip_amount,
    } = req.body;

    // Validation for essential fields
    if (!from || !to) {
      res.status(400).json({ success: false, error: 'Please provide both From and To locations' });
      return;
    }

    if (!customer_name || !phone_number) {
      res.status(400).json({ success: false, error: 'Please provide customer name and phone number' });
      return;
    }

    if (trip_amount === undefined || trip_amount === null || isNaN(Number(trip_amount))) {
      res.status(400).json({ success: false, error: 'Please provide a valid trip amount' });
      return;
    }

    const isToll = Boolean(toll);
    const finalTollAmount = isToll ? Number(toll_amount) || 0 : 0;

    const trip = await Trip.create({
      from,
      to,
      date: date ? new Date(date) : new Date(),
      fuel_amount: Number(fuel_amount) || 0,
      liters: Number(liters) || 0,
      toll: isToll,
      toll_amount: finalTollAmount,
      phone_number,
      customer_name,
      trip_amount: Number(trip_amount),
    });

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip by ID
// @route   PUT /api/trips/:id
// @access  Public
export const updateTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { toll, toll_amount } = req.body;

    const updateData = { ...req.body };
    if (toll !== undefined) {
      updateData.toll = Boolean(toll);
      updateData.toll_amount = updateData.toll ? Number(toll_amount) || 0 : 0;
    }

    const trip = await Trip.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!trip) {
      res.status(404).json({
        success: false,
        error: 'Trip not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Trip updated successfully',
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete trip by ID
// @route   DELETE /api/trips/:id
// @access  Public
export const deleteTrip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      res.status(404).json({
        success: false,
        error: 'Trip not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
