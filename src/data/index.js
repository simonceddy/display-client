import dataset from './test/dataset.json';

export * as dataset from './test/dataset.json';

const req = {
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3030'
  }
};

export function getTotalItemsFor(categoryId) {
  if (!dataset.categories[categoryId]
    || !dataset.categories[categoryId].items
  ) {
    return false;
  }
  return dataset.categories[categoryId].items.length;
}

export function getCategories() {
  return fetch('http://localhost:3030/api/', req)
    .then((res) => res.json())
    .catch(console.error);
  // return dataset.categories;
}

export function getCategory(categoryId) {
  return fetch(`http://localhost:3030/api/category/${categoryId}`, req)
    .then((res) => res.json())
    .catch(console.error);
  // return dataset.categories[categoryId] || false;
}

export function getCategoryItem(categoryId, itemId) {
  if (!dataset.categories[categoryId]
    || !dataset.categories[categoryId].items[itemId]
  ) {
    return false;
  }
  return dataset.categories[categoryId].items[itemId];
}

/**
 * Fetch app data
 * @returns {Promise}
 */
export function populateData() {
  // return getCategories();
  return Promise.resolve(dataset.categories);
}
