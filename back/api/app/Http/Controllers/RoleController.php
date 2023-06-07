<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roles = Role::all();
        return response()->json($roles);
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
        $role = new Role;
        $role->codigo = $request->codigo;
        $role->descripcion = $request->descripcion;
        $role->save();

        $data = [
            'mensaje' => 'Rol creado correctamente',
            'role' => $role
        ];

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
        return response()->json($role);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        //
        $role->codigo = $request->codigo;
        $role->descripcion = $request->descripcion;
        $role->save();

        $data = [
            'mensaje' => 'Rol actualizado correctamente',
            'role' => $role
        ];

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
        $role->delete();
    }

    public function usuarios(Request $request){
        $role = Role::find($request->role_id);
        $usuarios = $role->usuarios;
        $data = [
            'mensaje' => 'Consulta exitosa',
            'usuarios' => $usuarios
        ];
        return response()->json($data);
    }
}
