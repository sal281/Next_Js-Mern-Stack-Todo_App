import { NextResponse } from "next/server";
import TodoModel from "../../../lib/models/TodoModel";
import { ConnectDB } from "../../../lib/config/db";


let fetchModel = async () => {
    await ConnectDB()
}

fetchModel();



export async function GET(request) {
  try {
    let todoList = await TodoModel.find({});

    return NextResponse.json({ message: todoList });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format in the request body" },
        { status: 400 } // Bad Request
      );
    }

    // General error handling for other server issues
    return NextResponse.json(
      { error: "An error occurred while processing the request", details: error.message },
      { status: 500 } // Internal Server Error
    );
  }
}


export async function POST(request) {
  try {
    // Parsing the request body
    const { title, description } = await request.json();

    // Check for required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required fields" },
        { status: 400 } // Bad Request
      );
    }

    // Create a new todo item
    await TodoModel.create({ title, description });

    // Return success message
    return NextResponse.json(
      { message: "Todo item successfully created" },
      { status: 201 } // Created
    );
  } catch (error) {
    // Check for invalid JSON format in the request body
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format in the request body" },
        { status: 400 } // Bad Request
      );
    }

    // General error handling for other server issues
    return NextResponse.json(
      { error: "An error occurred while processing the request", details: error.message },
      { status: 500 } // Internal Server Error
    );
  }
}

export async function DELETE(request) {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const mongoId = searchParams.get("mongoId");

    // Validate that mongoId exists
    if (!mongoId) {
      return NextResponse.json(
        { error: "Invalid request. Missing 'mongoId'." },
        { status: 400 }
      );
    }

    // Attempt to delete the todo item by ID
    const deletedTodo = await TodoModel.findByIdAndDelete(mongoId);

    // Check if the todo item was found and deleted
    if (!deletedTodo) {
      return NextResponse.json(
        { error: "Todo not found or already deleted." },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Todo deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    // Catch any unexpected errors and return a 500 response
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const mongoId = searchParams.get("mongoId");

  // Validate that mongoId exists  // Attempt to delete the todo item by ID
   await TodoModel.findByIdAndUpdate(mongoId,{
    $set: {
       isComplete: true,
    }
  })
  return NextResponse.json({message: 'Todo Complete'})
}
