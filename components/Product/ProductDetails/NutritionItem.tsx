interface Props {
  nutrition: INutrition;
}

export default function NutritionItem({ nutrition }: Props) {
  const vitamins = nutrition.vitamins?.join(", ") || "";
  const minerals = nutrition.minerals?.join(", ") || "";
  const fixedNutrition = { ...nutrition, vitamins, minerals };
  return (
    <>
      {" "}
      {Object.keys(fixedNutrition).length > 0 ? (
        <div className="flex gap-1 border border-black-2 rounded p-2">
          <h2 className="font-semibold font-title underline">Nutrition:</h2>
          <ul>
            {Object.entries(fixedNutrition).map(([key, value]) => (
              <li key={key} className="font-text flex gap-1">
                <h2 className="font-semibold">{key}:</h2>
                <p>{value}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No nutrition information available.</p>
      )}
    </>
  );
}
