import { Team, columns } from "./columns"
import { DataTable } from "./data-table"
import mockData from '../assets/mock_data.json'

async function getData(): Promise<Team[]> {
  return mockData.rating;
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
