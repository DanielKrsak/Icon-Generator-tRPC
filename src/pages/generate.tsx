import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { setErrorMap } from "zod";
import Button from "~/components/Button";
import FormGroup from "~/components/FormGroup";
import Input from "~/components/Input";
import { api } from "~/utils/api";

const colors = [
  "blue",
  "red",
  "pink",
  "green",
  "orange",
  "yellow",
  "white",
  "black",
];

const shapes = ["square", "circle", "rounded"];

const styles = [
  "claymorphic",
  "3d rendered",
  "pixelated",
  "illustrated with color pencil",
];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
    shape: "",
    style: "",
    numberOfIcons: "1",
  });

  const [error, setError] = useState("");

  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setImagesUrl(data);
    },
    onError(error) {
      setError(error.message);
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    generateIcon.mutate({
      ...form,
      numberOfIcons: parseInt(form.numberOfIcons),
    });
  };

  const updateForm = (key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [key]: e.target.value,
      });
    };
  };

  return (
    <>
      <Head>
        <title>Generate Icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-24 flex min-h-screen flex-col gap-6 px-12">
        <h1 className="text-6xl">Generate Your Icons</h1>
        <p className="mb-12 text-2xl">
          Fill out the form below to start generating your icons
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
          <h2 className="text-xl">
            1. Describe what you want your icon to look like.
          </h2>
          <FormGroup className="mb-12">
            <label htmlFor="">Prompt</label>
            <Input
              value={form.prompt}
              required
              onChange={updateForm("prompt")}
            />
          </FormGroup>
          <h2 className="text-xl">2. Pick your icon color</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {colors.map((color) => {
              return (
                <label key={color} className="flex gap-2 text-lg lowercase">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    required
                    checked={color === form.color}
                    onChange={() =>
                      setForm((prev) => {
                        return { ...prev, color };
                      })
                    }
                  />
                  {color}
                </label>
              );
            })}
          </FormGroup>
          <h2 className="text-xl">3. Pick your icon shape</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {shapes.map((shape) => {
              return (
                <label key={shape} className="flex gap-2 text-lg lowercase">
                  <input
                    type="radio"
                    name="shape"
                    value={shape}
                    required
                    checked={shape === form.shape}
                    onChange={() =>
                      setForm((prev) => {
                        return { ...prev, shape };
                      })
                    }
                  />
                  {shape}
                </label>
              );
            })}
          </FormGroup>
          <h2 className="text-xl">4. Pick your icon style</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {styles.map((style) => {
              return (
                <label
                  key={style}
                  className="flex items-center gap-2 text-lg lowercase"
                >
                  <input
                    type="radio"
                    name="style"
                    value={style}
                    required
                    checked={style === form.style}
                    onChange={() =>
                      setForm((prev) => {
                        return { ...prev, style };
                      })
                    }
                  />
                  {style}
                </label>
              );
            })}
          </FormGroup>

          <h2 className="text-xl">5. How many do you want?</h2>
          <FormGroup className="mb-12">
            <label>Number of icons</label>
            <Input
              name="color"
              inputMode="numeric"
              pattern="[1-9]|10"
              required
              value={form.numberOfIcons}
              onChange={updateForm("numberOfIcons")}
            />
          </FormGroup>

          {error && (
            <div className="rounded bg-red-500 p-8 text-lg text-white">
              {error}
            </div>
          )}

          <Button
            isLoading={generateIcon.isLoading}
            disabled={generateIcon.isLoading}
          >
            Submit
          </Button>
        </form>
        {imagesUrl.length > 0 && (
          <>
            <h2 className="text-1xl">Your Icons</h2>
            <section className="mb-12 grid grid-cols-4 gap-4">
              {imagesUrl.map(({ imageUrl }) => {
                return (
                  <Image
                    key={imageUrl}
                    src={imageUrl}
                    alt="api-image"
                    height="512"
                    width="512"
                    className="w-full"
                  />
                );
              })}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
