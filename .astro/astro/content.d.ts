declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
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

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
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
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
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
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"config/cipher.mdx": {
	id: "config/cipher.mdx";
  slug: "config/cipher";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/firewall.mdx": {
	id: "config/firewall.mdx";
  slug: "config/firewall";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/handshake.mdx": {
	id: "config/handshake.mdx";
  slug: "config/handshake";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/lighthouse.mdx": {
	id: "config/lighthouse.mdx";
  slug: "config/lighthouse";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/listen.mdx": {
	id: "config/listen.mdx";
  slug: "config/listen";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/local-range.mdx": {
	id: "config/local-range.mdx";
  slug: "config/local-range";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/logging.mdx": {
	id: "config/logging.mdx";
  slug: "config/logging";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/pki.mdx": {
	id: "config/pki.mdx";
  slug: "config/pki";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/preferred-ranges.mdx": {
	id: "config/preferred-ranges.mdx";
  slug: "config/preferred-ranges";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/punchy.mdx": {
	id: "config/punchy.mdx";
  slug: "config/punchy";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/relay.mdx": {
	id: "config/relay.mdx";
  slug: "config/relay";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/routines.mdx": {
	id: "config/routines.mdx";
  slug: "config/routines";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/sshd.mdx": {
	id: "config/sshd.mdx";
  slug: "config/sshd";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/static-host-map.mdx": {
	id: "config/static-host-map.mdx";
  slug: "config/static-host-map";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/static-map.mdx": {
	id: "config/static-map.mdx";
  slug: "config/static-map";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/stats.mdx": {
	id: "config/stats.mdx";
  slug: "config/stats";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"config/tun.mdx": {
	id: "config/tun.mdx";
  slug: "config/tun";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"guides/debug-ssh-commands/index.mdx": {
	id: "guides/debug-ssh-commands/index.mdx";
  slug: "guides/debug-ssh-commands";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"guides/quick-start/index.mdx": {
	id: "guides/quick-start/index.mdx";
  slug: "guides/quick-start";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"guides/rotating-certificate-authority/index.mdx": {
	id: "guides/rotating-certificate-authority/index.mdx";
  slug: "guides/rotating-certificate-authority";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"guides/sign-certificates-with-public-keys/index.mdx": {
	id: "guides/sign-certificates-with-public-keys/index.mdx";
  slug: "guides/sign-certificates-with-public-keys";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"guides/unsafe_routes/index.mdx": {
	id: "guides/unsafe_routes/index.mdx";
  slug: "guides/unsafe_routes";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"guides/upgrade-to-cert-v2-and-ipv6/index.mdx": {
	id: "guides/upgrade-to-cert-v2-and-ipv6/index.mdx";
  slug: "guides/upgrade-to-cert-v2-and-ipv6";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"guides/using-lighthouse-dns/index.mdx": {
	id: "guides/using-lighthouse-dns/index.mdx";
  slug: "guides/using-lighthouse-dns";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"guides/viewing-nebula-logs/index.mdx": {
	id: "guides/viewing-nebula-logs/index.mdx";
  slug: "guides/viewing-nebula-logs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"security/2025-10-07-source-ip-spoofing-defect.mdx": {
	id: "security/2025-10-07-source-ip-spoofing-defect.mdx";
  slug: "security/2025-10-07-source-ip-spoofing-defect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
