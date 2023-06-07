<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $usuarios = Usuario::all();
        return response()->json($usuarios);
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
        $usuario = new Usuario;
        $usuario->name = $request->name;
        $usuario->email = $request->email;
        $usuario->phone = $request->phone;
        $usuario->password = $request->password;
        $usuario->activo = $request->activo;
        $usuario->cedula = $request->cedula;
        $usuario->area = $request->area;
        $usuario->cargo = $request->cargo;
        $usuario->sueldo_basico = $request->sueldo_basico;
        $usuario->condicion = $request->condicion;
        $usuario->estado = $request->estado;
        $usuario->save();
        $data = [
            'mensaje' => 'Usuario creado correctamente',
            'usuario' => $usuario
        ];

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario)
    {
        //
        $data = [
            'mensaje' => 'Consulta exitosa',
            'usuario' => $usuario,
            'roles' => $usuario->roles
        ];
        return response()->json($usuario);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuario $usuario)
    {
        //
        if(!is_null($request->name)){
            $usuario->name = $request->name;
        }
        if(!is_null($request->email)){
            $usuario->email = $request->email;
        }
        if(!is_null($request->phone)){
            $usuario->phone = $request->phone;
        }
        if(!is_null($request->password)){
            $usuario->password = $request->password;
        }
        if(!is_null($request->activo)){
            $usuario->activo = $request->activo;
        }
        if(!is_null($request->cedula)){
            $usuario->cedula = $request->cedula;
        }
        if(!is_null($request->area)){
            $usuario->area = $request->area;
        }
        if(!is_null($request->cargo)){
            $usuario->cargo = $request->cargo;
        }
        if(!is_null($request->sueldo_basico)){
            $usuario->sueldo_basico = $request->sueldo_basico;
        }
        if(!is_null($request->condicion)){
            $usuario->condicion = $request->condicion;
        }
        if(!is_null($request->estado)){
            $usuario->estado = $request->estado;
        }
        $usuario->save();

        $data = [
            'mensaje' => 'Usuario actualizado correctamente',
            'usuario' => $usuario
        ];

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Usuario $usuario)
    {
        //
        $usuario->delete();
    }

    public function attach(Request $request){
        $usuario = Usuario::find($request->usuario_id);
        $usuario->roles()->attach($request->role_id);
        $data = [
            'mensaje' => 'Rol agregado correctamente al usuario',
            'usuario' => $usuario
        ];
        return response()->json($data);
    }

    public function detach(Request $request){
        $usuario = Usuario::find($request->usuario_id);
        $usuario->roles()->detach($request->role_id);
        $data = [
            'mensaje' => 'Rol agregado correctamente al usuario',
            'usuario' => $usuario
        ];
        return response()->json($data);
    }

    public function auth(Request $request){
        $result = DB::select('CALL SP_USUARIOS_AUTH(?, ?)', [$request->email, $request->password]);
        $data = [
            'mensaje' => 'Email/contraseña incorrectos',
            'resultado' => 'FAIL'
        ];

        if(count($result)>0){
            $usuario = Usuario::find($result[0]->id);
            $usuario->roles; //Si llamo a la función, entonces se guardan los roles dentro de $usuario
            $data = [
                'mensaje' => 'Login correcto',
                'resultado' => 'OK',
                'usuario' => $usuario,
                
            ];
        }
        return response()->json($data);
    }

    public function find(Request $request){
        $result = DB::select('CALL SP_USUARIOS_GET_MATCHING(?, ?, ?)', [$request->cedula, $request->name, $request->area]);
        $data = [
            'mensaje' => 'Faild to load any results',
            'resultado' => 'FAIL',
            'usuarios' => []
        ];
        if(count($result)>0){
            $data = [
                'mensaje' => 'Users found',
                'resultado' => 'OK',
                'usuarios' => $result
            ];
        }

        return response()->json($data);
    }
}
