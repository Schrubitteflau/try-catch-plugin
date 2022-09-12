typescript error handling workflow

- l'usage de `throw` est interdit, sauf au sein d'une fonction asynchrone ou d'une fonction synchrone dont le nom commence par `assert` : `throw-only-in-assert-function`
- l'appel à une fonction dont le nom commence par `assert` doit obligatoirement être au sein d'un `try` : `must-try-catch-assert-function`
- les erreurs ne seront donc pas remontées de manière standard, mais on va s'inspirer d'autres langages comme le Go, où on va retourner un résultat contenant le retour de la fonction, et la possible erreur rencontrée :

```ts
type MayThrow<ReturnType, ErrorType extends Error> = {
    returnValue: null;
    error: ErrorType;
} | {
    returnValue: ReturnType;
    error: null;
};

function div(n1: number, n2: number): MayThrow<number, DivisionByZeroError | InvalidValueError>
{
    if (n2 === 0)
    {
        return {
            returnValue: null,
            error: new DivisionByZeroError("Can't divide by zero")
        };
    }

    if (n1 === 1)
    {
        return {
            returnValue: null,
            error: new InvalidValueError("First parameter can't be 1")
        };
    }

    return (n1 / n2);
}
```

On pourra bien sûr créer des fonctions utilitaires pour rendre le code plus lisible et éviter la duplication, par exemple :
```ts
function throwError<ErrorType extends Error>(error: ErrorType): MayThrow<null, ErrorType>
{
    return {
        returnValue: null,
        error
    };
}

function successfulReturn<ReturnType>(returnValue: ReturnValue): MayThrow<ReturnValue, null>
{
    return {
        returnValue,
        error: null
    };
}
```

Et des fonctions utilitaires pour traiter le résultat d'une fonction qui retourne un objet de type `MayThrow` :
```ts
function hasError<ErrorType>(mayThrowValue: MayThrow<unknown, ErrorType>): mayThrowValue is { returnValue: null; Error: ErrorType; }
{
    return (mayThrowValue.error !== null);
}
```̀
