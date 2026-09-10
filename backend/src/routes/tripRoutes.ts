import express, { Router } from 'express';
import {
  autocompletePlaces,
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} from '../controllers/tripController';

const router: Router = express.Router();

// Places autocomplete endpoint powered by Photon OpenStreetMap
router.get('/places-autocomplete', autocompletePlaces);

// Trip CRUD endpoints
router.route('/')
  .get(getTrips)
  .post(createTrip);

router.route('/:id')
  .get(getTripById)
  .put(updateTrip)
  .delete(deleteTrip);

export default router;
