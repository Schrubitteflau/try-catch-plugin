import { ok, err, Result } from 'neverthrow'

class AErr extends Error {}

function div(n1: number, n2: number)
{
    if (n2 === 0)
    {
        return err(new AErr())
    }

    if (n1 === 1)
    {
        return err(new SyntaxError())
    }
}