export const API_URL = {
  Authentication: {
    Signin: "/auth/signin",
    Signup: "/auth/signup",
    ForgetPassword: "/auth/forget-pass",
    resetPassword: "/auth/reset-pass",
    Sso: "/auth/sso/google/link",
  },

  User: {
    User: "/user",
    SendVerification: "/user/send-verification",
    Verify: "/user/verify",
    UserList: "/user/list",
    Ad: "/user/ad",
    Bookmark: "/user/bookmark",
    ChangePassword: "/user/change-pass",
    Comment: {
      comment: "/user/comment",
    },

    DeleteAccount: {
      request: "/user/delete-account-request",
      delete: "/user/delete-account",
    },

    Chat: {
      chat: "/user/chat",
      read: "/user/chat/read",
    },
    Notification: "/user/notification",

    FcmToken: "/user/fcm-token",

    ConvertToCompany: "/user/convert-to-company",

    Company: "/user/company",
  },
  Admin: {
    User: "/admin/user",
    Ad: "/admin/ad",
    Company: "/admin/company",
    Category: "/admin/category",
    Property: "/admin/property",
  },

  Category: {
    Category: "/category",
  },

  Public: {
    ad: "/ad",
    category: "/category",
  },

  General: {
    country: "/country",
    state: "/state",
    city: "/city",
  },
};
