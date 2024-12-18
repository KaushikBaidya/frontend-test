import { useState } from "react";
import ProductCard from "./components/ProductCard";
import CartModal from "./components/CartModal";

const App = () => {
	const [cart, setCart] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const products = [
		{
			id: 1,
			title: "Classy Modern Smart Watch",
			description:
				"I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the	system, and expound the actual teaching.",
			price: 79,
			colorNames: ["violet", "cyan", "blue", "black"],
			colors: ["#816BFF", "#1FCEC9", "#4B97D3", "#3B4747"],
			images: [
				"images/f1-image.png",
				"images/f2-image.png",
				"images/f3-image.png",
				"images/f4-image.png",
			],
			sizes: [
				{ size: "S", price: 69 },
				{ size: "M", price: 79 },
				{ size: "L", price: 89 },
				{ size: "XL", price: 99 },
			],
			rating: 2.5,
		},
		// Add more products here if needed
	];

	console.log(cart);

	// const handleAddToCart = (product) => {
	// 	setCart((prev) => {
	// 		const existingItem = prev.find(
	// 			(item) => item.id === product.id && item.size === product.size
	// 		);
	// 		if (existingItem) {
	// 			return prev.map((item) =>
	// 				item.id === product.id && item.size === product.size
	// 					? { ...item, quantity: item.quantity + product.quantity }
	// 					: item
	// 			);
	// 		} else {
	// 			return [...prev, { ...product, quantity: product.quantity }];
	// 		}
	// 	});
	// };
	const handleAddToCart = (product) => {
		setCart((prev) => {
			const existingItem = prev.find(
				(item) =>
					item.id === product.id &&
					item.size === product.size &&
					item.color === product.color // Include color in comparison
			);
			if (existingItem) {
				// Update quantity if product with same id, size, and color exists
				return prev.map((item) =>
					item.id === product.id &&
					item.size === product.size &&
					item.color === product.color
						? { ...item, quantity: item.quantity + product.quantity }
						: item
				);
			} else {
				// Add a new product with unique id, size, and color
				return [...prev, { ...product, quantity: product.quantity }];
			}
		});
	};

	return (
		<div className="bg-gray-100 font-sans min-h-screen flex flex-col items-center">
			<div className="flex flex-wrap justify-center gap-4 p-6">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onAddToCart={handleAddToCart}
					/>
				))}
			</div>

			<div className="mt-2">
				<button
					className=" bg-[#FFBB5A] text-gray-700 py-3 px-8 rounded-full flex items-center gap-2"
					onClick={() => setIsModalOpen(true)}
				>
					<span className="font-bold">Checkout </span>{" "}
					<span className="bg-white p-1 rounded-md"> ({cart.length})</span>
				</button>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<CartModal cart={cart} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

export default App;
