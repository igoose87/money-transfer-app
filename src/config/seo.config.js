const SITE_NAME = 'Bank app - vanilla js'
export const getTitle = (title) => {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}