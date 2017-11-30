# lowbar
A reimplementation of some of the key methods from the Underscore JS library. TDD included.
# Setup
- You will need version 7 or above of node. If you are unsure of your version open a terminal window and run:

```npm -v```

This will tell you which version you are currently running.

- You will also need npm installed. If you are unsure whether you have this, open a terminal window and run:

```npm -v```

If you have it installed, this will tell you the version. If you don't, run the following in your terminal window:

```npm install npm```

# Cloning and Installing

- Open your terminal and navigate to a folder to save the project in, then run:

```https://github.com/rosiearms/lowbar.git```

- Once you have the project installed, make sure you are in the project folder in your terminal, then run:

```npm install```

This will install all the dependencies needed to run the project.

- Then to run tests, run:

```npm test```

# Methods Featured

Miscellaneous

- _.identity - Returns whatever value is passed as the argument

Collections

- _.first - Returns an array of the first n elements of an array
- _.last - Returns an array of the last n elements of an array
- _.each - Calls the iterator for each element of a collection (array or object)
- _.indexOf - Returns the index at which the target can be found in the array
- _.filter - Return all elements of an array that pass a truth test
- _.reject - Return all elements of an array that do not pass a truth test
- _.uniq - Produce a duplicate-free version of the array
- _.map - Return the results of applying an iterator to each element
- _.pluck - Takes an array of objects and returns an array of the values of a certain property in it
- _.reduce - Reduces an array or object to a single value
- _.contains - Determine if the array of object contains a given value
- _.every - Determine whether all of the elements match a truth test
- _.some - Determine whether any of the elements pass a truth test

Objects

- _.extend - Extend a given object with all of the properties of the passed in object(s)
- _.defaults - Like _.extend, but does not overwrite a key that already exists in the object



