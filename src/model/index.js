import { Database } from '@nozbe/watermelondb'
// import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite' // not for the browser
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'


import schema from './schema'
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
// const adapter = new SQLiteAdapter({
//   schema,
//   // optional database name or file system path
//   // dbName: 'myapp',
//   // optional migrations
//   // migrations,
//   // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
//   synchronous: true,
//   // experimental JSI mode, a more advanced version of synchronous: true
//   // experimentalUseJSI: true,
//   // Optional, but you should implement this method:
//   onSetUpError: error => {
//     // Database failed to load -- offer the user to reload the app or log out
//   }
// })

const adapter = new LokiJSAdapter({
  schema,
  // migrations, // optional migrations
  useWebWorker: false, // recommended setting for new projects
  useIncrementalIndexedDB: true, // recommended for new projects. improves performance (but incompatible with early Watermelon databases)
  // dbName: 'myapp', // optional db name
  // Optional, but recommended event handlers:
  onIndexedDBVersionChange: () => {
    // database was deleted in another browser tab (user logged out), so we must make sure we delete
    // it in this tab as well
    // if (checkIfUserIsLoggedIn()) {
    //   window.location.reload()
    // }
  },
  onQuotaExceededError: (error) => {
    // Browser ran out of disk space -- do something about it
  },
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    // Post, // ⬅️ You'll add Models to Watermelon here
  ],
  actionsEnabled: true,
})
