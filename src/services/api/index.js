const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/${VERSION}/auth/login`,
    profile: `${API}/${VERSION}/auth/profile`,
  },
  products: {
    getProduct: (id) => `${API}/${VERSION}/products/${id}`,
    getProducts: (limit, offset) => `${API}/${VERSION}/products?limit=${limit}&offset=${offset}`,
    getAllProducts: `${API}/${VERSION}/products`,
    addProducts: `${API}/${VERSION}/products`,
    updateProduct: (id) => `${API}/${VERSION}/products/${id}/`,
    deleteProduct: (id) => `${API}/${VERSION}/products/${id}/`,
  },
  categories: {
    getCategories: `${API}/${VERSION}/categories/`,
    getCategory: (id) => `${API}/${VERSION}/categories/${id}/`,
    addCategory: `${API}/${VERSION}/categories`,
    updateCategory: (id) => `${API}/${VERSION}/categories/${id}/`,
  },
  users: {
    getUsers: `${API}/${VERSION}/users`,
    getUser: (id) => `${API}/${VERSION}/users/${id}`,
    deleteUser: (id) => `${API}/${VERSION}/users/${id}`,
  },
  files: {
    addImage: `${API}/${VERSION}/files/upload/`,
  },
};

export default endPoints;
