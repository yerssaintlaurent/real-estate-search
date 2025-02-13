import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";

const listings = [
  { id: 1, title: "Квартира в центре", price: "300 тыс", town: "Астана", features: ["Кондиционер", "Шумоизоляция"] },
  { id: 2, title: "Апартаменты у парка", price: "350 тыс", town: "Астана", features: ["Балкон", "Консьерж"] },
  { id: 3, title: "Студия у метро", price: "280 тыс", town: "Москва", features: ["Паркинг", "Вид на город"] },
];

export default function RealEstateSearch() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ кондиционер: false, шумоизоляция: false });

  const handleFilterChange = (feature) => {
    setFilters((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const filteredListings = listings.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(search.toLowerCase()) &&
      Object.entries(filters).every(([key, value]) => !value || listing.features.includes(key))
    );
  });

  return (
    <div className="flex h-screen p-6 bg-gray-100">
      <aside className="w-1/4 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Фильтры</h2>
        {Object.keys(filters).map((feature) => (
          <div key={feature} className="flex items-center gap-2 mb-2">
            <Checkbox checked={filters[feature]} onCheckedChange={() => handleFilterChange(feature)} />
            <span>{feature}</span>
          </div>
        ))}
      </aside>
      <main className="flex-1 p-4">
        <Input
          className="w-full mb-4 p-2 border rounded-md"
          placeholder="Введите запрос..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-3 gap-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="p-4 shadow-md rounded-2xl">
              <CardContent>
                <h3 className="text-lg font-bold">{listing.title}</h3>
                <p className="text-gray-500">{listing.town}</p>
                <p className="text-blue-600 font-semibold">{listing.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
