import { Router } from 'express'
import { controllerHandler } from '../../../../shared/lib/system/controllerHandler'
import { addCategory } from '../controllers/addCategory'
import { addSubCategory } from '../controllers/addSubCategory'
import { deleteCategory } from '../controllers/deleteCategory'
import { deleteSubCategory } from '../controllers/deleteSubCategory'
import { getAllCategories } from '../controllers/getAllCategories'
import { getAllSubCategories } from '../controllers/getAllSubCategories'
import { getCategoryById } from '../controllers/getCategoryById'
import { getSubCategoryById } from '../controllers/getSubCategoryById'
import { getSubCategoryInCategory } from '../controllers/getSubcategoryInCategory'
import { updateCategory } from '../controllers/updateCategory'
import { updateSubCategory } from '../controllers/updateSubCategory'
import { addCategorySchema } from '../validations/addCategorySchema'
import { SubCategorySchema } from '../validations/SubCategorySchema'
import { updateCategorySchema } from '../validations/updateCategorySchema'

const router = Router()

router.post('/categories', controllerHandler({
  controller: addCategory,
  schema: addCategorySchema
}))

router.get('/categories', controllerHandler({
  controller: getAllCategories,
  options: { transaction: false }
}))

router.get('/categories/category/:id', controllerHandler({
  controller: getCategoryById,
  options: { transaction: false }

}))

router.put('/categories/:id', controllerHandler({
  controller: updateCategory,
  schema: updateCategorySchema

}))

router.delete('/categories/:id', controllerHandler({
  controller: deleteCategory
}))

router.post('/categories/sub-categories', controllerHandler({
  controller: addSubCategory,
  schema: SubCategorySchema
}))

router.put('/categories/sub-categories/:id', controllerHandler({
  controller: updateSubCategory,
  schema: SubCategorySchema
}))

router.delete('/categories/sub-categories/:id', controllerHandler({
  controller: deleteSubCategory
}))

router.get('/categories/subcategory/:id', controllerHandler({
  controller: getSubCategoryById,
  options: { transaction: false }

}))

router.get('/categories/subcategories', controllerHandler({
  controller: getAllSubCategories,
  options: { transaction: false }

}))

router.get('/categories/category/subcategories/:id', controllerHandler({
  controller: getSubCategoryInCategory,
  options: { transaction: false }
}))

export default router
