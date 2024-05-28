<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public function index ()
    {
        $data = Book::latest()->paginate(10);

        foreach ($data as $book) {
            $book->cover = url('/assets/images/' . $book->cover);
            $book->publish_date = Carbon::parse($book->publish_date)->translatedFormat('d F Y');
        }

        return new BookResource(true, "Book List", $data);
    }

    public function detail ($id)
    {
        $book = Book::findOrFail($id);

        $book->cover = url('/assets/images/' . $book->cover);
        $book->publish_date = Carbon::parse($book->publish_date)->translatedFormat('d F Y');

        return new BookResource(true, "Detail book", $book);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'cover' => 'required|image|mimes:png,jpg,jpeg',
            'description' => 'required',
            'author' => 'required',
            'publisher' => 'required',
            'publish_date' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $book = new Book;

        $book->title = $request->title;
        $book->description = $request->description;
        $book->author = $request->author;
        $book->publisher = $request->publisher;
        $book->publish_date = Carbon::createFromFormat('d-m-Y', $request->publish_date);
        if ($request->hasFile('cover')) {
            $file = $request->file('cover');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('assets/images/', $filename);
            $book->cover = $filename;
        }
        
        $book->save();

        if ($book) {
            return new BookResource(true, "Book created successfully!", $book);
        } else {
            return new BookResource(false, "Failed to add new book!", null);
        }
    }

    public function update ($id)
    {
        $data = Book::findOrFail($id);

        $data->publish_date = Carbon::parse($data->publish_date)->format('d-m-Y');
        
        return new BookResource(true, "Book data", $data);
    } 

    public function post_update (Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'author' => 'required',
            'publisher' => 'required',
            'publish_date' => 'required',
            'cover' => 'image|mimes:png,jpg,jpeg',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $book = Book::findOrFail($id);

        if ($request->hasFile('cover')) {
            $filepath = public_path('assets/images/' . $book->cover);
            if (File::exists($filepath)) {
                File::delete($filepath);
            }
    
            $file = $request->file('cover');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('assets/images'), $filename);

            $book->update([
                'title' => $request->title,
                'description' => $request->description,
                'author' => $request->author,
                'publisher' => $request->publisher,
                'publish_date' => Carbon::createFromFormat('d-m-Y', $request->publish_date),
                'cover' => $filename,
            ]);
        } else {
            $book->update([
                'title' => $request->title,
                'description' => $request->description,
                'author' => $request->author,
                'publisher' => $request->publisher,
                'publish_date' => Carbon::createFromFormat('d-m-Y', $request->publish_date),
                'cover' => $book->cover,
            ]);
        }

        if ($book) {
            return new BookResource(true, "Book updated successfully!", $book);
        } else {
            return new BookResource(false, "Book updated failed!", null);
        }
    }

    public function delete ($id)
    {
        $book = Book::find($id);

        $filepath = public_path('assets/images/' . $book->cover);

        if (File::exists($filepath)) {
            File::delete($filepath);
        }

        $book->delete();

        if ($book) {
            return new BookResource(true, "Book deleted successfully!", null);
        } else {
            return new BookResource(false, "Failed to delete book!", null);
        }
    }

    public function search_book (Request $request)
    {
        $query = $request->search;

        $data = DB::table('books')
                ->where('title', 'LIKE', $query)
                ->latest()
                ->paginate(10);

        foreach ($data as $book) {
            $book->cover = url('/assets/images/' . $book->cover);
            $book->publish_date = Carbon::parse($book->publish_date)->translatedFormat('d F Y');
        }

        return new BookResource(true, "Book search", $data);
    }
}
