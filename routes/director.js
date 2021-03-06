const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

// Get All Directors
router.get('/', (req, res) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          firstName: '$firstName',
          lastName: '$lastName',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        firstName: '$_id.firstName',
        lastName: '$_id.lastName',
        movies: '$movies'
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
// Get Director By ID
router.get('/:director_id', (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          firstName: '$firstName',
          lastName: '$lastName',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        firstName: '$_id.firstName',
        lastName: '$_id.lastName',
        movies: '$movies'
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
// Add New Director
router.post('/', (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});
// Update Director By ID
router.put('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndUpdate(
    req.params.director_id, 
    req.body,
    {
      new: true
    }
    );

  promise.then((director) => {
    if (!director)
      next({ message: 'The director isn\'t found!', code: 1});
      
    res.json(director);
  }).catch((err) => {
    res.json(err);
  });
});
// Delete Director By ID
router.delete('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);

  promise.then((director) => {
    if (!director)
      next({ message: 'The director isn\'t found!', code: 1});

    res.json({ status: 1});
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
