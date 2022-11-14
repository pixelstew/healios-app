# Healios Exercise

## Getting Started

Install the dependencies...

```bash
cd healios-exercise
npm install
```

First, run the development server:

```bash
npm run dev
```

To run tests:

```bash
npm run test
or
npm run test:watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `pages/index.tsx`. The page
auto-updates as you edit the file.

## Known issues

I ran into a bug with MSW and Next.js.

The call for data in `getStaticProps` fails with an unrecognised URL (404
basically). I spent some time trying to debug but couldn't find a solution. I
downloaded teh starter Nex project from MSW and it was suffering the same issue
so was not my implementation.

As a result I spent more time than allocated by you guys and I cut my losses and
created a quick mock class although this does not show the API implementation I
had created in action.

Assuming that `patient` and `currentUser` would be passed in context or props
from further up the tree.

```typescript
/api/patient/:patientId/notes - GET
/api/patient/:patientId/notes/:noteId - DELETE, PATCH
```

MSW also seems to be delaying initialising the service worker leading to long
first load.

## Key technologies

- `Next.js`
- `swr` This library is great for fetching data and managing the state of the
  data, allows for easy caching and revalidation of data and optimistic updates.
- `jest`
- `react-testing-library`
- `date-fns`
- `@faker-js/faker`- I used this to generate fake data for the mock API
- `jest-axe` for accessibility testing

## Limitations/Next steps

If I had some more time, I would have done the following:

- Add more tests
- Add error handling
- Add more accessibility testing
- Add more styling/come up with a better design. I spent some time failing to
  get `MSW` set up so this was a bit rushed.
- Add a better loading state
- Add more functionality to the API
- Look at pagination/lazy loading
- Look at filtering results on page
- Look for alternative mock apis to `MSW`
- implemented SSR or SSG
