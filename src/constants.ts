// routes
export enum AUTH {
  CREATE_ACCOUNT = "/auth/create-account", // post
  LOGIN = "/auth/login", // post
  DELETE_ACCOUNT = "/auth/delete" // delete
}

export enum ADMIN {}

export enum LINKS {
  MY_LINKS = "/links", // get
  CREATE_LINK = "/links" // post
}

// headers
export enum HEADERS {
  AUTH = "x-authorization"
}
