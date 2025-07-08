<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use LaravelIdea\Helper\App\Models\_IH_Category_C;

class CategoryController extends Controller
{

    /**
     * Liste des categories.
     * @return Category[]|Collection|_IH_Category_C
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Créer une nouvelle catégorie.
     * @param CategoryRequest $request
     * @return Category
     */
    public function store(CategoryRequest $request)
    {
        return Category::create($request->validated());
    }

    /**
     * Details d'une catégorie spécifique.
     * @param Category $category
     * @return Category
     */
    public function show(Category $category)
    {
        return $category;
    }

    /**
     * Mise à jour d'une catégorie spécifique.
     * @param CategoryRequest $request
     * @param Category $category
     * @return Category
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return $category;
    }

    /**
     * Supprimer une catégorie spécifique.
     * @param Category $category
     * @return JsonResponse
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json();
    }
}
