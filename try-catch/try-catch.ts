// Example of try-catch written functionally
// https://itnext.io/if-else-and-try-catch-as-functional-constructs-da5c6a749f8c
// In a standard try-catch construct, if we want to manipulate
// a variable in both the try and catch blocks we
// need to declare it with let --> this means there will be side effects
// and thus this is against the FP paradigm

// We can write try-catch functionality
export function tryCatch<Props, Result>({
    tryer, 
    catcher
}: {
    tryer: (props: Props) => Result;
    catcher: (props: Props, message: string) => Result;
}) {
    return (props) => {
        try {
            return tryer(props);
        } catch (e) {
            return catcher(props, e.message);
        }
    }
}

// Example use case
const storeLanguageCode = tryCatch({
    tryer: (languageCode) => {
        window.localStorage.setItem('LANG_CODE', languageCode);
        return true;
    },
    catcher: (languageCode, errorMessage) => {
        // Log info about the error here
        console.log(`${errorMessage} <--- happened while storing ${languageCode}`)
        return false
    }
});

const setUserLanguage = pipe(
    getLanguageCode,
    languageCode => storeLanguageCode(languageCode),
    storedSuccessfully => ({ storedSuccessfully})
)