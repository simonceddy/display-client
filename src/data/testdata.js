import dataset from './test/dataset.json';

export * as dataset from './test/dataset.json';

export function getTotalItemsFor(categoryId) {
  if (!dataset.categories[categoryId]
    || !dataset.categories[categoryId].items
  ) {
    return false;
  }
  return dataset.categories[categoryId].items.length;
}

export function getCategories() {
  return dataset.categories;
}

export function getCategory(categoryId) {
  return dataset.categories[categoryId] || false;
}

export function getCategoryItem(categoryId, itemId) {
  if (!dataset.categories[categoryId]
    || !dataset.categories[categoryId].items[itemId]
  ) {
    return false;
  }
  return dataset.categories[categoryId].items[itemId];
}
