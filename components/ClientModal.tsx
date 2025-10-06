"use client";

import React from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Set app element for accessibility (prevents screen readers from reading background)
if (typeof window !== "undefined") {
	Modal.setAppElement("body");
}

export type ClientItem = { name: string; impact: string };

type Props = {
	isOpen: boolean;
	onClose: () => void;
	client: ClientItem | null;
};

/**
 * ClientModal
 * A scrollable, centered modal with backdrop blur.
 *
 * TODO: BACKEND — The `client` object should be provided from data fetched via
 * `fetchClientsForTicker` in `lib/api.ts` or a similar endpoint.
 */
export default function ClientModal({ isOpen, onClose, client }: Props) {
	return (
		<AnimatePresence>
			{isOpen && (
				<Modal
					isOpen={isOpen}
					onRequestClose={onClose}
					contentLabel="Client details"
					overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
					className="outline-none"
					shouldCloseOnOverlayClick
					aria={{ labelledby: "client-modal-title" }}
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ type: "spring", stiffness: 260, damping: 22 }}
						className="w-full max-w-lg rounded-xl bg-neutral-900 text-neutral-100 shadow-2xl ring-1 ring-white/10"
					>
						<div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
							<h2 id="client-modal-title" className="text-lg font-semibold">
								{client?.name ?? "Client"}
							</h2>
							<button
								className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
								onClick={onClose}
								aria-label="Close"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					<div className="max-h-[60vh] overflow-auto px-5 py-4 space-y-3">
							<p className="text-sm text-neutral-300">
								{client?.impact ?? "Impact details to be provided by backend."}
							</p>
							<div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-neutral-300">
								Additional analysis and historical exposures can be displayed here once
								available from backend endpoints.
							</div>
						</div>
					{/* Single close control is the X button in the header */}
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	);
}


