import {AddVehicleInformation, VehicleManagement} from '../screens';

const en = {
  appName: 'fuelbusters',
  auth: {
    or: 'OR',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    email: 'Email',
  },
  login: {
    continueAsGuest: 'Continue as Guest',
    forgotPassword: 'Forgot password?',
    signin: 'Sign in',
    title: 'Welcome back!',
    subTitle:
      'Enter your registered email ID and \npassword to login into your account.',
  },
  signup: {
    signup: 'Sign Up',
    confirmPassword: 'Confirm password',
    Phone: 'Phone number',
    title: 'Create your account!',
    subTitle: 'Join us today by setting up your\npersonalized account.',
    fullName: 'Full name',
    bottomSubTitleP1: 'By tapping Sign up you agree to our\n',
    bottomSubTitleP2: 'and',
  },
  forgotPassword: {
    title: 'Forgot your password?',
    subTitle:
      'Enter your email and we will send you a link to reset your password.',
  },
  otpVerification: {
    title: 'Verify your email.',
    subTitle: 'We have sent a verification code to',
    bottomSubTitle: "Didn't receive the OTP? Resend OTP in",
  },
  profileSuccess: {
    title: 'Profile created successfully!',
    subTitle:
      "Your profile has been successfully completed! You're all set to enjoy seamless order fuel and exclusive app features.",
  },
  subscription: {
    headerTitle: 'Subscriptions',
    title: 'Upgrade plan to Highly Experience.',
  },
  orderDetails: {
    headerTitle: 'Order Details',
    vehicleDetails: 'Vehicle Details',
    deliveryTime: 'Delivery Time',
    towardsDestination: 'Towards Destination',
    deliveryAddress: 'Delivery Address',
    paymentDetails: 'Payment Details',
    subTotal: 'Subtotal',
    Tax: 'Tax',
    youEarn: 'You Earn',
    markAsDelivered: 'Mark as Delivered',
    delivered: 'Delivered',
  },
  orderSuccess: {
    title: 'Order Successfully Delivered!',
    checkMyOrders: 'Check My Orders',
    subTitle:
      'You’ve successfully delivered the fuel. Thank\n you for providing excellent service! Check\n your earnings and move on to the next\n delivery.',
  },
  addVehicleInformation: {
    headerTitle: 'Vehicle Information',
    title: 'Upgrade plan to Highly Experience.',
    uploadImages: 'Upload Images',
    uploadImage: 'Upload image',
    supportJpg: 'Support jpg, png & jpeg',
    basicInfo: 'Basic info',
    vehicleRegistrationNo: 'Vehicle registration number',
    manufacturerAndModel: 'Manufacturer and model',
    fuelTankCapacity: 'Fuel tank capacity in gallon',
    fuelTypeSupported: 'Fuel Type Supported',
    insuranceDocs: 'Insurance Documents',
    addMoreVehicle: 'Add More Vehicle',
    uploadImageReason:
      'We require few images for your vehicle (Add\n5 images).',
    price: 'Price',
    licenseNo: 'License number',
  },
  addDrivingLicense: {
    headerTitle: 'Driving License',
    basicInfo: 'Basic info',
    licenseNo: 'License number',
    licenseImages: 'License Images',
    uploadFrontSide: 'Upload front side image',
    uploadBackSide: 'Upload back side image',
  },
  profile: {
    headerTitle: 'Profile',
    editProfile: 'Edit',
  },
  editProfile: {
    headerTitle: 'Edit Profile',
    changeProfilePic: 'Change profile picture',
  },
  aboutUs: {
    headerTitle: 'About Us',
  },
  ratingAndReviews: {
    headerTitle: 'My Reviews',
    overAllRatings: 'Overall Ratings',
  },
  addBank: {
    headerTitle: 'Bank account',
  },
  privacyPolicy: {
    headerTitle: 'Privacy Policy',
  },
  notificationSetting: {
    headerTitle: 'Notification Settings',
    pushNotification: 'Push Notification',
    textNotification: 'Text Notification',
  },
  changePassword: {
    headerTitle: 'Change Password',
    oldPassword: 'Current Password',
    newPassword: 'New Password',
    password: 'Password',
    confirmNewPassword: 'Confirm New Password',
  },
  tnc: {
    headerTitle: 'Terms and Conditions',
  },
  chat: {
    headerTitle: 'Chats',
  },
  editVehicle: {
    headerTitle: 'Edit Vehicle Information',
  },
  vehicleManagement: {
    headerTitle: 'Vehicle Management',
    addMore: 'Add More',
  },
  contactUs: {
    message: 'Write your message here',
    bottomSubTitle:
      'We always try our best to respond to each\nmember within 48 business hours. We appreciate\nyour patience.',
    headerTitle: 'Contact Us',
  },
  notifications: {
    headerTitle: 'Notifications',
    clearAll: 'Clear all',
  },
  myEarning: {
    headerTitle: 'My Earnings',
    recentTransactions: 'Recent Transactions',
    withdrawal: 'withdraw',
    totalEarnings: 'Total Earnings',
    totalEarning: 'Total Earning',
    totalOrders: 'Total Orders',
    timeOnline: 'Time Online',
    cancelOrders: 'Cancel Orders',
  },
  orders: {
    headerTitle: 'My Orders',
    orderHistory: 'Order History',
    upcomingOrders: 'Upcoming Orders',
  },
  common: {
    verify: 'Verify',
    skip: 'Skip',
    continue: 'Continue',
    submit: 'Submit',
    cancel: 'Cancel',
    share: 'Share',
    done: 'Done',
    camera: 'Camera',
    gallery: 'Gallery',
    documents: 'Documents',
    delete: 'Delete',
    update: 'Update',
    clearAll: 'Clear All',
    apply: 'Apply',
  },
};

export default en;
export type Translations = typeof en;
