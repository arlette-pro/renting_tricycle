
/**
 * @typedef {"Admin" | "PT" | "LT"} UserRole
 */

/**
 * @typedef LoginDto
 * @property {string} email
 * @property {string} password
 */


/**
 * @typedef RegisterUserDto
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 * @property {string} firstName
 * @property {string} lastName
 * @property {UserRole} role
 */


/**
 * @typedef AdminRegisterUserDto
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {UserRole} role
 */


/**
 * @typedef User
 * @property {string} id
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {UserRole} role
 */