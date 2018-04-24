import * as Pages from '@pages'

const Route = (path, label, component, children, options) => (
    Object.assign({}, options, { path, label, component, children })
)

export default {
    home:   Route('/',      'Home', Pages.Home, undefined, { exact: true }),
    about:  Route('/about', 'About', Pages.About, {
        bio:    Route('/bio', 'Biography', Pages.Bio)
    })
}