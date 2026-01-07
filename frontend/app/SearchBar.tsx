"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";

z.config({
    customError: () => {
        return "Invalid input!";
    },
});

const formSchema = z.object({
    departure_airport: z.string().nonempty(),
    arrival_airport: z.string().nonempty(),
    date_range: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .refine((data) => !!data.from, {
            error: "Please select a departure date.",
        }),
    pax: z.number(),
});

const SearchBar = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            departure_airport: "",
            arrival_airport: "",
            date_range: {
                from: undefined,
                to: undefined,
            },
            pax: 1,
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("submitted");

        const apiPayload = {
            ...data,
            from: data.date_range.from
                ? format(data.date_range.from, "yyyy-MM-dd")
                : undefined,
            to: data.date_range.to
                ? format(data.date_range.to, "yyyy-MM-dd")
                : undefined,
        };

        toast("You submitted the following values:", {
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(apiPayload, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        });
    }

    return (
        <div className="h-auto w-full rounded-xl border-2 p-4">
            <form
                className="w-full"
                id="search-flights"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FieldGroup className="xl:flex-row">
                    <FieldGroup>
                        <FieldContent>
                            <FieldLabel htmlFor="airports">Airports</FieldLabel>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full lg:w-1/2">
                                    <Controller
                                        name="departure_airport"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <Input
                                                    {...field}
                                                    id="airports"
                                                    placeholder="Departing from?"
                                                    className="bg-background"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        className="text-xs"
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <Controller
                                        name="arrival_airport"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <Input
                                                    {...field}
                                                    id="airports"
                                                    placeholder="Going to?"
                                                    className="bg-background"
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError
                                                        className="text-xs"
                                                        errors={[
                                                            fieldState.error,
                                                        ]}
                                                    />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </div>
                        </FieldContent>
                    </FieldGroup>
                    <FieldGroup>
                        <FieldContent>
                            <FieldLabel>Dates</FieldLabel>
                            <Controller
                                name="date_range"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="dates"
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {field.value?.from &&
                                                    field.value?.to
                                                        ? `${field.value.from.toLocaleDateString()} - ${field.value.to.toLocaleDateString()}`
                                                        : "Pick your dates"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto overflow-hidden p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="range"
                                                    selected={{
                                                        from: field.value.from,
                                                        to: field.value.to,
                                                    }}
                                                    onSelect={field.onChange}
                                                    disabled={{
                                                        before: new Date(),
                                                    }}
                                                    className="rounded-lg border shadow-sm"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {fieldState.invalid && (
                                            <FieldError
                                                className="text-xs"
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldContent>
                    </FieldGroup>
                    <FieldGroup>
                        <FieldContent>
                            <FieldLabel>Number of passengers</FieldLabel>
                            <Controller
                                name="pax"
                                control={form.control}
                                render={({ field }) => (
                                    <InputGroup className="bg-background">
                                        <InputGroupButton
                                            type="button"
                                            onClick={() => {
                                                field.onChange(field.value - 1);
                                            }}
                                            disabled={field.value <= 1}
                                        >
                                            <MinusIcon />
                                        </InputGroupButton>
                                        <InputGroupInput
                                            className="selection:bg-primary selection:text-primary-foreground w-full grow px-3 py-2 text-center tabular-nums outline-none"
                                            value={field.value}
                                            readOnly={true}
                                        />
                                        <InputGroupButton
                                            type="button"
                                            onClick={() => {
                                                field.onChange(field.value + 1);
                                            }}
                                        >
                                            <PlusIcon />
                                        </InputGroupButton>
                                    </InputGroup>
                                )}
                            />
                        </FieldContent>
                    </FieldGroup>
                    <Button
                        type="submit"
                        form="search-flights"
                        className="mt-6"
                    >
                        Search
                    </Button>
                </FieldGroup>
            </form>
        </div>
    );
};

export default SearchBar;
