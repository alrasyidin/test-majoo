import { formatDistance, formatRelative } from "date-fns"

export const formatDate = (date) => {
  if (!date) {
    return undefined
  }

  return formatDistance(new Date(date), new Date())
}
