const CartModal = ({ cart, onClose }) => {
	// Calculate total price and total quantity
	const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = cart.reduce(
		(sum, item) => sum + item.quantity * item.price,
		0
	);

	console.log("modal", cart);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white w-11/12 md:w-3/4 lg:w-2/4 rounded-lg p-6 shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="text-gray-600">
							<th className="pb-2">Item</th>
							<th className="pb-2">Color</th>
							<th className="pb-2">Size</th>
							<th className="pb-2">Qnt</th>
							<th className="pb-2">Price</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((item, index) => (
							<tr key={index} className="border-t">
								<td className="py-4 flex items-center gap-2">
									<img
										src={item.image}
										alt={item.title}
										className="w-12 h-12 rounded"
									/>
									<span className="text-gray-800">{item.title}</span>
								</td>
								<td className="py-4">{item.color}</td>
								<td className="py-4 font-bold">{item.size.toUpperCase()}</td>
								<td className="py-4 font-semibold">{item.quantity}</td>
								<td className="py-4 font-bold">
									${item.price * item.quantity}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="mt-4 flex justify-between items-center border-t pt-4">
					<h3 className="text-lg font-semibold text-gray-700">
						Total: <span className="font-bold">{totalQuantity}</span>
					</h3>
					<h3 className="text-2xl font-bold text-gray-800">
						${totalPrice.toFixed(2)}
					</h3>
				</div>

				<div className="flex justify-end mt-6 gap-4">
					<button
						onClick={onClose}
						className="py-2 px-6 border border-gray-400 text-gray-700 rounded hover:bg-gray-200"
					>
						Continue Shopping
					</button>
					<button className="py-2 px-6 bg-[#816BFF] text-white rounded hover:bg-indigo-700">
						Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
