import { useFormAction, useNavigation } from '@remix-run/react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import translate from 'translate'
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// //@ts-ignore
// import * as parse from "pdf-parse";

/**
 * Does its best to get a string error message from an unknown error.
 */
export function getErrorMessage(error: unknown) {
	if (typeof error === 'string') return error
	if (
		error &&
		typeof error === 'object' &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		return error.message
	}
	console.error('Unable to get error message for error', error)
	return 'Unknown Error'
}

/**
 * A handy utility that makes constructing class names easier.
 * It also merges tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Provide a condition and if that condition is falsey, this throws a 400
 * Response with the given message.
 *
 * inspired by invariant from 'tiny-invariant'
 *
 * @example
 * invariantResponse(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Response} if condition is falsey
 */
export function invariantResponse(
	condition: any,
	message?: string | (() => string),
	responseInit?: ResponseInit,
): asserts condition {
	if (!condition) {
		throw new Response(
			typeof message === 'function'
				? message()
				: message ||
				  'An invariant failed, please provide a message to explain why.',
			{ status: 400, ...responseInit },
		)
	}
}

/**
 * Returns true if the current navigation is submitting the current route's
 * form. Defaults to the current route's form action and method POST.
 */
export function useIsSubmitting({
	formAction,
	formMethod = 'POST',
}: {
	formAction?: string
	formMethod?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
} = {}) {
	const contextualFormAction = useFormAction()
	const navigation = useNavigation()
	return (
		navigation.state === 'submitting' &&
		navigation.formAction === (formAction ?? contextualFormAction) &&
		navigation.formMethod === formMethod
	)
}

export function assertNonNull<PossibleNullType>(
  possibleNull: PossibleNullType,
  errorMessage: string
): asserts possibleNull is Exclude<PossibleNullType, null | undefined> {
  if (possibleNull == null) throw new Error(errorMessage);
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
export function getNonNull<
  Type extends Record<string, null | undefined | unknown>,
>(obj: Type): NonNullProperties<Type> {
  for (const [key, val] of Object.entries(obj)) {
    assertNonNull(val, `The value of ${key} is null but it should not be.`);
  }
  return obj as NonNullProperties<Type>;
}

export function getErrorForLanguage(title: string | null) {
  if (!title) return `Language is required`;

  const minLength = 1;
  const maxLength = 80;
  if (title.length < minLength) {
    return `Title must be at least ${minLength} characters`;
  }
  if (title.length > maxLength) {
    return `Title must be no longer than ${maxLength} characters`;
  }
  return null;
}

export function getErrorForAudio(audio: string | null) {
  if (!audio) return "Audio file is required";
  return null;
}

export function combineDocuments(docs:any){
    return docs.map((doc:any)=>doc.pageContent).join('\n\n')
}

export  function formatConvHistory(messages: string[]) {
	return messages.map((message, i) => {
		if (i % 2 === 0){
			return `Human: ${message}`
		} else {
			return `AI: ${message}`
		}
	}).join('\n')
}


export async function translateFrom(str:string, language:string) {
	//@ts-ignore
	translate.engine = 'libre'; 
	const translated_string = await translate(str, language);
	console.log(translated_string);
	return translated_string
}



// export async function loadpdf() {
//     const loader = new PDFLoader('app/assets/faq.pdf')
//     const docs = await loader.load();
//     return docs
// }