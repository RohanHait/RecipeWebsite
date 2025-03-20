import { createTable } from "@/app/lib/db"

export default function GET(req: Request){
    try{
        createTable();
    }catch(e){
        return Response.json({status: 500, body: {message: 'Failed to create tables', error: e}})
    }
    return Response.json({status: 200, body: {message: 'Tables created successfully'}})
}