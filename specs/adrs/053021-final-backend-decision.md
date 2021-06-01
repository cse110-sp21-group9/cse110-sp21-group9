# Final Backend decision
Status: Accepted

Deciders: Alan, Daisuke, Edmund, Edward, Elisa, Etienne, Evan, Kenny

Date: 5/30/2021

## Decisions
We decided to move to a localStorage backend as the backend for our final app. The reasoning behind this decision was that creating a login feature with a remote database backend was taking too long and we needed to get something out as soon as possible. 

### Backend structure 
- write-through cache 
  - using runtime as a cache 
  - whenever we write, we write both to the runtime cache and to the backing storage
  - whenever we read, we read only from runtime cache 
  - Important variables: 
    - **localStorage** - backing storage
    - **runTimeBullets**(object/hashmap) - runtime cache for bullets 
    - **runTimeTags**(object/hashmap) - runtime cache for tags 
    - **lastID** - ID of last bullet added to cache
 
### Backend functions (CRUD)
- **createBullet()** 
  - Assigns next ID to bullet
  - writes bullet to runTimeBullets
  - Writes bullet to local storage 
- Also have functions to get bullets from specific ranges/spans/type
- Also have functions to update fields of bullets, delete bullets 
- **Creating tags**
  - Need to call **createTag()** globally first
  - Then create bullet with the new tag 
- Can add/remove tags from individual bullets, and remove tags globally 
- **initCrudRunTime()** needs to be run every time each page loads

### LocalStorage format:
```
{
	lastID: (null if fresh localstorage)
  	bulletIDs: {
		array: [array of IDs]
	}
	<id of a bullet>: <data for that bullet>
	tags: {<tag name>: true}
}
```

### import/export functions 
- import: fill localstorage from JSON file for use in runtimeBullets 
- export: move localstorage into JSON file for bullet saving