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
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        ]);

        $product = Product::create($validatedData);

        return response()->json(['message' => 'Product ajouté', $product], 201);
    }

    /**
     * Details d'un product spécifique.
     */
    public function show($id): \Illuminate\Http\JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
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
        ]);

        $product->update($validatedData);

        return response()->json($product);
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
