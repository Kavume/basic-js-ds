const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {

    this.left = null;
    this.right = null;

    this.rootCurrent = null;

  }


  root() {

    return this.rootCurrent;
  }

  add( data ) {

    this.rootCurrent = addWithin( this.rootCurrent, data );

    function addWithin( node, data) {

      if (!node) {
        return new Node(data);
      }

      if ( node.data === data ) {
        return node;
      }

      if ( data < node.data ) {
        node.left = addWithin( node.left, data) ;

      } else {
        node.right = addWithin( node.right, data);
      }

      return node;
    }
  }

  has( data ) {

    return searchWithin( this.rootCurrent, data );

    function searchWithin(node, data) {

      if( !node ) return false;

      if ( node.data === data ) return true;

      return data < node.data ? searchWithin( node.left , data ) : searchWithin( node.right , data );
    }
  }

  find( data ) {

    return findWithin( this.rootCurrent, data );

    function findWithin(node, data) {

      if( !node ) return null;

      if ( node.data === data ) return node;

      return data < node.data ? findWithin( node.left , data ) : findWithin( node.right , data );
    }

  }

  remove( data ) {

    this.rootCurrent = removeNode( this.rootCurrent, data );

    function removeNode( node, data){

      if ( !node ) return null;

      if ( data < node.data ) {
        node.left = removeNode( node.left, data);
        return node;

      } else if ( data > node.data ) {
        node.right = removeNode( node.right, data);
        return node;

      } else {

        if ( !node.left && !node.right ) return null; // leave

        if ( !node.left ) {
          node = node.right;
          return node;
        }

        if ( !node.right ) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right; // start from the root of the right subtree

        while ( minFromRight.left ) {

          minFromRight = minFromRight.left; // found the min value
        }

        node.data = minFromRight.data; // this node will be deleted

        node.right = removeNode( node.right, minFromRight.data );

        return node;

      }

    }

  }

  min() {

    if ( !this.rootCurrent ) return;

    let node = this.rootCurrent; // start to search from the root of the tree

    while ( node.left ) {
      node = node.left;
    }

    return node.data;
  }

  max() {

    if ( !this.rootCurrent ) return;

    let node = this.rootCurrent; // start to search from the root of the tree

    while ( node.right ) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};