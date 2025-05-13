<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Agenda;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $agendas = Agenda::all();
            return response()->json(['data' => $agendas], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve profile users', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            
            Auth::check();

            $userId = Auth::id();
    
            if (!$userId) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }

            $validatedData = $request->validate([
                'agenda_name' => 'required|string',
                'is_routine' => 'required|boolean',
                'start_time' => 'required|date',
                'end_time' => 'required|date',
                'participants' => 'nullable',
                'doc' => 'nullable|mimes:pdf|min:100|max:500',
                
            ]);

            $validatedData['created_by'] = $userId;
            $validatedData['uuid'] = Str::uuid();
        
            if (empty($validatedData['participants'])) {
                $validatedData['participants'] = json_encode(['everyone']);
            } else {
                $participants = [];
                foreach ($validatedData['participants'] as $id) {
                    $user = User::find($id);
                    if ($user) {
                        $participants[] = $user->id;
                    }
                }
                $validatedData['participants'] = empty($participants) ? json_encode(['everyone']) : json_encode($participants);
            }

            if ($request->hasFile('doc')) {
                $docmetPath = $request->file('doc')->store('dokumen-meeting', 'public');
                $data['doc'] = $docmetPath;
            }
            
            $agenda = Agenda::create($validatedData);

            return response()->json(['message' => 'Agenda created successfully', 'data' => $agenda], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create agenda', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $uuid)
    {
        try {
            $agenda = Agenda::where('uuid', $uuid)->firstOrFail();
            return response()->json($agenda);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Agenda not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error fetching agenda', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $uuid)
    {
        try {
            $agenda = Agenda::where('uuid', $uuid)->firstOrFail();
            // Validate the request data
            $validatedData = $request->validate([
                'agenda_name' => 'sometimes|string',
                'is_routine' => 'sometimes|boolean',
                'start_time' => 'sometimes|date',
                'end_time' => 'sometimes|date',
                'participants' => 'nullable|array',
                'doc' => 'nullable|mimes:pdf|max:500',
            ]);

            // Find the agenda by UUID

            // Update fields if they are present in the request
            if (isset($validatedData['agenda_name'])) {
                $agenda->agenda_name = $validatedData['agenda_name'];
            }
            if (isset($validatedData['is_routine'])) {
                $agenda->is_routine = $validatedData['is_routine'];
            }
            if (isset($validatedData['start_time'])) {
                $agenda->start_time = $validatedData['start_time'];
            }
            if (isset($validatedData['end_time'])) {
                $agenda->end_time = $validatedData['end_time'];
            }

            if ($request->hasFile('doc')) {
                $docmetPath = $request->file('doc')->store('dokumen-meeting', 'public');
                $agenda->doc = $docmetPath;
            }

             // Handle participants update
             if (isset($validatedData['participants'])) {
                if (empty($validatedData['participants'])) {
                    $agenda->participants = json_encode(['everyone']);
                } else {
                    $participants = [];
                    foreach ($validatedData['participants'] as $id) {
                        $user = User::find($id);
                        if ($user) {
                            $participants[] = $user->id;
                        }
                    }
                    $agenda->participants = empty($participants) ? json_encode(['everyone']) : json_encode($participants);
                }
            }

            // Save the changes
            $agenda->save();

            // Return a success response
            return response()->json(['message' => 'Agenda updated successfully', 'data' => $agenda], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Agenda not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            // Handle any other exceptions
            return response()->json(['message' => 'Failed to update agenda', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        try {
            $agenda = Agenda::where('uuid', $uuid)->firstOrFail();
            $agenda->delete();
            return response()->json(['message' => 'Agenda deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Agenda not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete agenda', 'error' => $e->getMessage()], 500);
        }
    }

    public function trashed()
    {
        try {
            $agendas = Agenda::onlyTrashed()->get();
            return response()->json($agendas, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve trashed agenda', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Restore the specified resource.
     */
    public function restore($id)
    {
        try {
            $agendas = Agenda::withTrashed()->findOrFail($id);
            $agendas->restore();
            return response()->json(['message' => 'Agenda restored'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Agenda not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to restore Agenda', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Permanently delete the specified resource.
     */
    public function forceDelete($id)
    {
        try {
            $agendas = Agenda::withTrashed()->findOrFail($id);
            $agendas->forceDelete();
            return response()->json(['message' => 'Agenda permanently deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Agenda not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to permanently delete Agenda', 'error' => $e->getMessage()], 500);
        }
    }
}
