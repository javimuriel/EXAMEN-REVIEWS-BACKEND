import { check } from 'express-validator'

const create = [
  check('satrs').exists().isInt({ min: 0, max: 5 }).withMessage('Stars must be an integer between 0 and 5'),
  check('body').optional({ nullable: true, checkFalsy: true }).isString().withMessage('Body must be a string'),
  check('restaurantId').exists().isInt({ min: 1 }).withMessage('Restaurant Id must be a positive integer'),
  check('customerId').exists().isInt({ min: 1 }).withMessage('Customer Id must be a positive integer')
]

const update = [
  check('satrs').exists().isInt({ min: 0, max: 5 }).withMessage('Stars must be an integer between 0 and 5'),
  check('body').optional({ nullable: true, checkFalsy: true }).isString().withMessage('Body must be a string'),
  check('restaurantId').exists().isInt({ min: 1 }).withMessage('Restaurant Id must be a positive integer'),
  check('customerId').exists().isInt({ min: 1 }).withMessage('Customer Id must be a positive integer')
]

export { create, update }
