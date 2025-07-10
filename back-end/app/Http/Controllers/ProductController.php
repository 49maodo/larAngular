<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Liste des products.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $products = Product::with('category')->get();
        return response()->json($products);
    }

    /**
     * Créer un nouveau product.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::create($validatedData)->load('category');

        return response()->json(['message' => 'Product ajouté', $product], 201);
    }

    /**
     * Details d'un product spécifique.
     */
    public function show($id): \Illuminate\Http\JsonResponse
    {
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    /**
     * Modifier un product existant.
     */
    public function update(Request $request, Product $product) : \Illuminate\Http\JsonResponse
    {

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

//        return response()->json($validatedData);

        $product->update($validatedData);
        // Recharger la relation category pour renvoyer les données mises à jour
        $product->load('category');

        return response()->json([
            'message' => 'Product modifié',
            'data' => $product,
        ], 200);
    }

    /**
     * Supprimer un product existant.
     */
    public function destroy($id) : \Illuminate\Http\JsonResponse
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 204);
    }
}
