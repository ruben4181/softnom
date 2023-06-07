<?php

namespace App\Http\Controllers;

use App\Models\Recargo;
use Illuminate\Http\Request;

class RecargoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $recargos = Reacargo::all();
        return response()->json($recargos);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $recargo = new Recargo;
        $recargo->horas = $request->hora;
        $recargo->valor_hora = $request->valor_hora;
        $recargo->valor_total = $request->valor_total;
        $recargo->descripcion = $request->descripcion;
    }

    /**
     * Display the specified resource.
     */
    public function show(Recargo $recargo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recargo $recargo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recargo $recargo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recargo $recargo)
    {
        //
    }
}
