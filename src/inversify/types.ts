const TYPES = {
  IUserLoginRepo: Symbol.for("IUserLoginRepo"),
  IUserLoginService: Symbol.for("IUserLoginService"),

  IEventBookingService:Symbol.for('IEventBookingService'),
  IEventBookingRepo:Symbol.for('IEventBookingRepo'),

  IStripeService:Symbol.for('IStripeService'),
  IStripeRepo:Symbol.for('IStripeRepo'),

  IUserProfileService:Symbol.for('IUserProfileService'),
  IUserProfileRepo:Symbol.for('IUserProfileRepo'),

  IRetryEventService:Symbol.for('IRetryEventService'),
  IRetryEventRepo:Symbol.for('IRetryEventRepo'),

  INotificationVideoCallService:Symbol.for('INotificationVideoCallService'),
  INotificationVideoCallRepo:Symbol.for('INotificationVideoCallRepo'),

};

export default TYPES;
