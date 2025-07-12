import { Order, Review } from '../models/models.js'

const userHasPlacedOrderInRestaurant = async (req, res, next) => {
  const { restaurantId } = req.params
  const userId = req.user.id
  const ordersCount = await Order.count({ userId, restaurantId })
  if (ordersCount === 0) {
    return res.status(403).json({ message: 'You must place an order in the restaurant before reviewing.' })
  }
  next()
}

const checkCustomerHasNotReviewed = async (req, res, next) => {
  try {
    const { restaurantId } = req.params
    const customerId = req.user.id
    const reviewExists = await Review.findOne({ where: { restaurantId, customerId } })
    if (reviewExists) {
      return res.status(403).json({ message: 'You have already reviewed this restaurant.' })
    }
    next()
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while checking for existing reviews.', err })
  }
}

const checkReviewOwnership = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (review.customerId !== req.user.id) {
    return res.status(403).json({ message: 'You do not have permission to modify this review.' })
  }
  next()
}

const checkReviewBelongsToRestaurant = async (req, res, next) => {
  const { restaurantId, reviewId } = req.params

  try {
    const review = await Review.findByPk(reviewId)

    // El comparador doble es intencionado por la diferencia de tipo de datos string vs integer
    // eslint-disable-next-line eqeqeq
    if (review.restaurantId != restaurantId) {
      return res.status(409).json({ error: 'Review does not belong to the specified restaurant.' })
    }

    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { checkCustomerHasNotReviewed, userHasPlacedOrderInRestaurant, checkReviewOwnership, checkReviewBelongsToRestaurant }
