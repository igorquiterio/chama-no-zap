"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Delete, Plus, Send } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
	const [_phoneNumber, _setPhoneNumberr] = React.useState("+55");

	const formatPhoneNumber = (phone: string) => {
		const digits = phone.replace(/\D/g, "");

		let formatted = "+";
		if (digits.length > 0) {
			formatted += digits.slice(0, 2);
		}
		if (digits.length > 2) {
			formatted += ` (${digits.slice(2, 4)}`;
		}
		if (digits.length > 4) {
			formatted += `) ${digits.slice(4, 9)}`;
		}
		if (digits.length > 8) {
			formatted += `-${digits.slice(9, 13)}`;
		}

		return formatted.trim();
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Card className="w-full max-w-sm rounded-2xl">
				<CardHeader>
					<CardTitle className="text-sm">
						Digite o numero com quem você quer conversar
						<div className="w-full text-2xl bg-background rounded-2xl p-2 mt-4 h-20 flex items-center ">
							{formatPhoneNumber(_phoneNumber)}
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-4 flex-wrap justify-center flex-row-reverse">
					{Array.from({ length: 9 }, (_, i) => 9 - i).map((number) => (
						<Button
							key={number}
							variant={"outline"}
							className="h-20 w-24 text-2xl"
							onClick={() => _setPhoneNumberr(_phoneNumber + number)}
						>
							{number}
						</Button>
					))}
					<Button
						variant={"outline"}
						className="h-20 w-24"
						onClick={() => _setPhoneNumberr(_phoneNumber.slice(0, -1))}
					>
						<Delete className="size-7" />
					</Button>
					<Button
						variant={"outline"}
						className="h-20 w-24"
						onClick={() => _setPhoneNumberr(`${_phoneNumber}+`)}
					>
						<Plus className="size-7" />
					</Button>

					<Button
						key={0}
						variant={"outline"}
						className="h-20 w-24 text-2xl"
						onClick={() => _setPhoneNumberr(_phoneNumber + 0)}
					>
						{0}
					</Button>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button
						variant={"default"}
						className="h-20 w-full"
						onClick={() => {
							redirect(`http://wa.me/${_phoneNumber}?text=Olá`);
						}}
					>
						<Send className="size-7" />
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
