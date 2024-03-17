declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"100-days-of-gatsby.mdx": {
	id: "100-days-of-gatsby.mdx";
  slug: "100-days-of-gatsby";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"adios-2011-hola-2012.mdx": {
	id: "adios-2011-hola-2012.mdx";
  slug: "adios-2011-hola-2012";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"adios-2013-no-te-voy-a-extranar.mdx": {
	id: "adios-2013-no-te-voy-a-extranar.mdx";
  slug: "adios-2013-no-te-voy-a-extranar";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"algunas-cosas-que-aprendi.mdx": {
	id: "algunas-cosas-que-aprendi.mdx";
  slug: "algunas-cosas-que-aprendi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"an-egg.mdx": {
	id: "an-egg.mdx";
  slug: "an-egg";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"barcamp-mexico-5-queretaro.mdx": {
	id: "barcamp-mexico-5-queretaro.mdx";
  slug: "barcamp-mexico-5-queretaro";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"breaking-bad-fan-video-walt-jesse.mdx": {
	id: "breaking-bad-fan-video-walt-jesse.mdx";
  slug: "breaking-bad-fan-video-walt-jesse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cafe-pendiente.mdx": {
	id: "cafe-pendiente.mdx";
  slug: "cafe-pendiente";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"chris-hadfield-on-folowing-our-dreams.mdx": {
	id: "chris-hadfield-on-folowing-our-dreams.mdx";
  slug: "chris-hadfield-on-folowing-our-dreams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"colombia-bogota.mdx": {
	id: "colombia-bogota.mdx";
  slug: "colombia-bogota";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"colombia-cali-e-ipiales.mdx": {
	id: "colombia-cali-e-ipiales.mdx";
  slug: "colombia-cali-e-ipiales";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"colombia-medellin.mdx": {
	id: "colombia-medellin.mdx";
  slug: "colombia-medellin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"como-empece-a-programar.mdx": {
	id: "como-empece-a-programar.mdx";
  slug: "como-empece-a-programar";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"contentlayer-nextjs.mdx": {
	id: "contentlayer-nextjs.mdx";
  slug: "contentlayer-nextjs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cosas-del-mirc-scripting.mdx": {
	id: "cosas-del-mirc-scripting.mdx";
  slug: "cosas-del-mirc-scripting";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cual-es.mdx": {
	id: "cual-es.mdx";
  slug: "cual-es";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cuida-tus-ojos-busca-la-verdad.mdx": {
	id: "cuida-tus-ojos-busca-la-verdad.mdx";
  slug: "cuida-tus-ojos-busca-la-verdad";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"denny-crane-rlz.mdx": {
	id: "denny-crane-rlz.mdx";
  slug: "denny-crane-rlz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"descubriendo-el-verdadero-miedo.mdx": {
	id: "descubriendo-el-verdadero-miedo.mdx";
  slug: "descubriendo-el-verdadero-miedo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"detectar-bloqmayus-con-javascript.mdx": {
	id: "detectar-bloqmayus-con-javascript.mdx";
  slug: "detectar-bloqmayus-con-javascript";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"dudando-de-la-existencia-de-dios.mdx": {
	id: "dudando-de-la-existencia-de-dios.mdx";
  slug: "dudando-de-la-existencia-de-dios";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"el-2009.mdx": {
	id: "el-2009.mdx";
  slug: "el-2009";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"el-2010.mdx": {
	id: "el-2010.mdx";
  slug: "el-2010";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"el-alma-de-la-ciudad.mdx": {
	id: "el-alma-de-la-ciudad.mdx";
  slug: "el-alma-de-la-ciudad";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"el-amor-es-una-cosa-maravillosa.mdx": {
	id: "el-amor-es-una-cosa-maravillosa.mdx";
  slug: "el-amor-es-una-cosa-maravillosa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"el-samurai-y-el-pescador.mdx": {
	id: "el-samurai-y-el-pescador.mdx";
  slug: "el-samurai-y-el-pescador";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"en-busca-de-la-felicidad.mdx": {
	id: "en-busca-de-la-felicidad.mdx";
  slug: "en-busca-de-la-felicidad";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"felices-fiestas.mdx": {
	id: "felices-fiestas.mdx";
  slug: "felices-fiestas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"filtro-de-palabras-en-php.mdx": {
	id: "filtro-de-palabras-en-php.mdx";
  slug: "filtro-de-palabras-en-php";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"geocaching-un-pasatiempo-interesante.mdx": {
	id: "geocaching-un-pasatiempo-interesante.mdx";
  slug: "geocaching-un-pasatiempo-interesante";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"get-rid-of-huge-font-awesome-icons-on-gatsby.mdx": {
	id: "get-rid-of-huge-font-awesome-icons-on-gatsby.mdx";
  slug: "get-rid-of-huge-font-awesome-icons-on-gatsby";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"gulp-js-y-sus-tareas.mdx": {
	id: "gulp-js-y-sus-tareas.mdx";
  slug: "gulp-js-y-sus-tareas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"homero-simpson-y-yo.mdx": {
	id: "homero-simpson-y-yo.mdx";
  slug: "homero-simpson-y-yo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"la-sabiduria-del-aguila.mdx": {
	id: "la-sabiduria-del-aguila.mdx";
  slug: "la-sabiduria-del-aguila";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"la-vida-es-un-instante.mdx": {
	id: "la-vida-es-un-instante.mdx";
  slug: "la-vida-es-un-instante";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"ludovico-einaudi-divenire.mdx": {
	id: "ludovico-einaudi-divenire.mdx";
  slug: "ludovico-einaudi-divenire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"mi-experiencia-con-arch-linux.mdx": {
	id: "mi-experiencia-con-arch-linux.mdx";
  slug: "mi-experiencia-con-arch-linux";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"miracle-sudoku.mdx": {
	id: "miracle-sudoku.mdx";
  slug: "miracle-sudoku";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"pendejo.mdx": {
	id: "pendejo.mdx";
  slug: "pendejo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"personajes-en-los-esports.mdx": {
	id: "personajes-en-los-esports.mdx";
  slug: "personajes-en-los-esports";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"recuerdos.mdx": {
	id: "recuerdos.mdx";
  slug: "recuerdos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"resize-images-for-phpbb3.mdx": {
	id: "resize-images-for-phpbb3.mdx";
  slug: "resize-images-for-phpbb3";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"salem.mdx": {
	id: "salem.mdx";
  slug: "salem";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"sencillas-preguntas-para-pensar.mdx": {
	id: "sencillas-preguntas-para-pensar.mdx";
  slug: "sencillas-preguntas-para-pensar";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"simplificar-codigo.mdx": {
	id: "simplificar-codigo.mdx";
  slug: "simplificar-codigo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"theres-other-ways-to-fill-your-head.mdx": {
	id: "theres-other-ways-to-fill-your-head.mdx";
  slug: "theres-other-ways-to-fill-your-head";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"tunel-ssh-en-windows-usando-putty.mdx": {
	id: "tunel-ssh-en-windows-usando-putty.mdx";
  slug: "tunel-ssh-en-windows-usando-putty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"twitter-highlight.mdx": {
	id: "twitter-highlight.mdx";
  slug: "twitter-highlight";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"united-we-rise.mdx": {
	id: "united-we-rise.mdx";
  slug: "united-we-rise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"usar-font-awesome-con-grunt.mdx": {
	id: "usar-font-awesome-con-grunt.mdx";
  slug: "usar-font-awesome-con-grunt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"utiles-plugins-para-gulp.mdx": {
	id: "utiles-plugins-para-gulp.mdx";
  slug: "utiles-plugins-para-gulp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"viajando.mdx": {
	id: "viajando.mdx";
  slug: "viajando";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"wordpress-bootstrap-3-e-ie8.mdx": {
	id: "wordpress-bootstrap-3-e-ie8.mdx";
  slug: "wordpress-bootstrap-3-e-ie8";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
