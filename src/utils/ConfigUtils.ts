/**
 * * Validates that collection type changes are not made when items are already selected
 */ 
export const validateCollectionTypeChange = (
  value: null | string | string[] | undefined,
  { data }: { data: any }
) => {
  // If trying to change collection type and there are items selected
  if (
    data?.collectionItems &&
    Array.isArray(data.collectionItems) &&
    data.collectionItems.length > 0 &&
    value !== data?.collectionItems[0]?.relationTo
  ) {
    return 'You must clear all collection items before changing the collection type'
  }

  return true
} 

/**
 * *Condition to show collection items field only when a collection is selected
 */
export const shouldShowCollectionItems = (data: any) => {
    return data.selectedCollection && data.selectedCollection !== ''
  }