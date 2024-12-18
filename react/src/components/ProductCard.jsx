import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProductCard = ({ product, onAddToCart }) => {
	const [selectedImage, setSelectedImage] = useState(product.images[0]);
	const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);
	const [selectedQuantity, setSelectedQuantity] = useState(1);

	// Determine the currently selected color index
	const selectedColorIndex = product.images.indexOf(selectedImage);
	const selectedColor = product.colors[selectedColorIndex] || "#000"; // Default to black if not found

	const handleColorChange = (image) => {
		setSelectedImage(image);
	};

	const handleSizeChange = (size) => {
		setSelectedSize(size);
	};

	const handleQuantityChange = (increment) => {
		setSelectedQuantity((prev) => Math.max(1, prev + increment));
	};

	const addToCart = () => {
		// Find the selected price based on the selected size
		const selectedPrice = product.sizes.find(
			(sizeObj) => sizeObj.size === selectedSize
		)?.price;

		onAddToCart({
			id: product.id,
			title: product.title,
			image: selectedImage, // Only pass the selected image
			color: product.colorNames[selectedColorIndex], // Selected color name
			size: selectedSize,
			price: selectedPrice, // Dynamic price based on size
			quantity: selectedQuantity,
		});

		setSelectedQuantity(1); // Reset quantity to 1
		alert("Product added to cart!");
	};

	// const addToCart = () => {
	// 	// Find the selected price based on the selected size
	// 	const selectedPrice = product.sizes.find(
	// 		(sizeObj) => sizeObj.size === selectedSize
	// 	)?.price;

	// 	onAddToCart({
	// 		id: product.id,
	// 		title: product.title,
	// 		images: product.images,
	// 		color: product.colorNames[selectedColorIndex],
	// 		size: selectedSize,
	// 		price: selectedPrice, // Pass the dynamic price based on size
	// 		quantity: selectedQuantity,
	// 	});
	// 	setSelectedQuantity(1); // Reset quantity to 1
	// 	alert("Product added to cart!");
	// };

	return (
		<div className="max-w-6xl mx-auto flex justify-center items-center min-h-[80vh]">
			<div className="p-6 flex items-center justify-start gap-10">
				<img
					src={selectedImage}
					alt={product.title}
					className="w-[32rem] h-auto rounded-lg"
				/>

				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold text-[#3B4747]">{product.title}</h1>
					<div className="flex items-center mt-2">
						{[...Array(5)].map((_, index) => (
							<span key={index}>
								{index < Math.round(product.rating) ? (
									<AiFillStar className="text-yellow-500" />
								) : (
									<AiOutlineStar className="text-gray-400" />
								)}
							</span>
						))}
						<span className="pl-2 text-sm text-gray-600">(2 Reviews)</span>
					</div>

					<p className="text-lg font-semibold">
						<span className="line-through font-normal text-gray-600">
							$99.00
						</span>{" "}
						<span style={{ color: selectedColor }}>${product.price}</span>
					</p>
					<p className="text-gray-600 text-sm">{product.description}</p>
					<div className="w-3/4 grid grid-cols-2 text-sm">
						<div className="flex flex-col items-start justify-start gap-2">
							<span className="text-gray-600">Type</span>
							<span className="text-[#3B4747] font-bold">Watch</span>
						</div>
						<div className="flex flex-col items-start justify-start gap-2">
							<span className="text-gray-600">Model Number</span>
							<span className="text-[#3B4747] font-bold">Forerunner 290XT</span>
						</div>
					</div>
					<div className="mt-2">
						<h3 className="text-[#3B4747] font-medium">Band Color</h3>
						<div className="flex items-center gap-4 mt-2">
							{product.colors.map((color, index) => (
								<div
									key={index}
									className="border-2 rounded-full cursor-pointer"
									style={{
										borderColor:
											selectedImage === product.images[index]
												? `${color}`
												: "transparent",
									}}
									onClick={() => handleColorChange(product.images[index])}
								>
									<div
										className="w-4 h-4 m-[2px] rounded-full"
										style={{
											backgroundColor: color,
										}}
									></div>
								</div>
							))}
						</div>
					</div>

					<div className="mt-2">
						<h3 className="text-[#3B4747] font-medium">Size</h3>
						<div className="flex items-center gap-4 mt-2">
							{product.sizes.map((size) => (
								<button
									key={size.size}
									className={`border py-1 px-4 rounded hover:bg-gray-200 ${
										selectedSize === size.size ? "border-2" : "border-gray-400"
									}`}
									style={{
										borderColor:
											selectedSize === size.size ? selectedColor : "gray",
									}}
									onClick={() => handleSizeChange(size.size)}
								>
									<span className="uppercase font-bold text-[#3B4747]">
										{size.size}
									</span>
									($
									{size.price})
								</button>
							))}
						</div>
					</div>

					<div className="mt-4 flex items-center gap-4">
						<div className="flex items-center justify-around gap-4 px-2 border text-lg">
							<button
								className="border-r border-gray-200 pr-2"
								onClick={() => handleQuantityChange(-1)}
							>
								-
							</button>
							<span className="text-gray-600 font-medium">
								{selectedQuantity}
							</span>
							<button
								className="border-l border-gray-200 pl-2"
								onClick={() => handleQuantityChange(1)}
							>
								+
							</button>
						</div>
						<button
							className="py-2 px-4 rounded hover:bg-opacity-90"
							style={{
								backgroundColor: selectedColor,
								color: "white",
							}}
							onClick={addToCart}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
