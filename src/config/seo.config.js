const SITE_NAME = 'App - vanilla js'
export const getTitle = (title) => {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}