class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    
    root = this.buildTree(array)

    buildTreeRecursion(array, start, end) {
        if (start > end) return null;

        // Find the middle element
        let mid = start + Math.floor((end - start) / 2);
    
        // Create root node
        let root = new Node(array[mid]);
    
        // Create left subtree
        root.left = this.buildTreeRecursion(array, start, mid - 1);
    
        // Create right subtree
        root.right = this.buildTreeRecursion(array, mid + 1, end);
    
        return root;
    }

    buildTree(array) {
        array.sort((a, b) => a - b)
        console.log(array)
        return this.buildTreeRecursion(array, 0, array.length - 1)
    }

    insert(value) {
        let currentNode = this.root;
        let nodePath = '';
    
        // Loop to compare value with nodeValue to get nodePath
        while (currentNode) {
          if (value < currentNode.data) {
            // console.log(`${value} is less than ${currentNode.data}, hence left`)
            nodePath += '.left';
            currentNode = currentNode.left;
          } 
          else if (value > currentNode.data) {
            nodePath += '.right';
            // console.log(`${value} is greater than ${currentNode.data}, hence right`)
            currentNode = currentNode.right;
          } 
          else if (value == currentNode.data) {
            return this.root; 
          }
        }
    
        let parts = nodePath.split('.');
        parts.shift()
        // console.log('nodePath as array', parts)

        // Current is used as a reference (similar to pointers in other languages)
        // current is referencing to root. This is pointing to the same memory location
        // so when current is modified, so will root.
        let current = this.root;

        // This will iterate through the nodePath (was converted into an array)
        // to select the node
        for (let i = 0; i < parts.length - 1; i++) {
            if (parts[i] == 'right') {
                current = current.right
                
            }
            else if (parts[i] == 'left') {
                current = current.left
            }
        }

        // Once at the final node, a new node is created in the tree
        if (parts[parts.length - 1] === 'left') {
          current.left = new Node(value);
        } else {
            // console.log(current.right)
          current.right = new Node(value);
        }
    
        return this.root;
    }

    deleteItem(value) {
        if (!this.root) {
            return null
        }
        else {
            this.root = this.deleteNode(this.root, value)
        }
    }

    deleteNode(root, value) {
        if (root == null) {
            return root
        }

        if (root.data == value) {
            // Node has no childrean
            if(!root.left && !root.right) {
                return null
            }
            // Node has one child
            else if (!root.left) {
                return root.right
            }
            else if (!root.right) {
                return root.left
            }
            // Node has 2 children
            else {
                root.data = this.findMin(root.right)
                root.right = this.deleteNode(root.right, root.data)
            }
        }
        else if (root.data < value) {
            root.right = this.deleteNode(root.right, value)
        }
        else if (root.data > value) {
            root.left = this.deleteNode(root.left, value)
        }
        

        return root
    }

    findMin(node) {
        let current = node;
        while (current.left !== null) {
          current = current.left;
        }
        return current.data;
    }

    find(value) {
        if (!this.root) {
            return null
        }
        else {
            return this.findNode(this.root, value)
        }
    }

    findNode(root, value) {
        if (!root) {
            return 'No match'
        }

        if (root.data == value) {
            return `Found value: ${root.data}`
        }
        else if (root.data < value) {
            return this.findNode(root.right, value)
        }
        else if (root.data > value) {
            return this.findNode(root.left, value)
        }
    }

    levelOrder(callback) {
        if (!this.root) return;

        if (!callback) {
            return console.error('Callback function required');
            
        }

        const queue = [this.root]

        while (queue.length > 0) {
            const node = queue.shift()
            // console.log(node)
            console.log(callback(node.data))

            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }

        }
    }

    inOrder(callback, root = this.root) {

        if (!callback) {
            return console.error('Callback function required');
            
        }

        if (root) {
            this.inOrder(callback, root.left)
            console.log(callback(root.data))
            this.inOrder(callback, root.right)
        }
    }

    preOrder(callback, root = this.root) {

        if (!callback) {
            return console.error('Callback function required');
            
        }

        if (root) {
            console.log(callback(root.data))
            this.preOrder(callback, root.left)
            this.preOrder(callback, root.right)
        }
    }

    postOrder(callback, root = this.root) {

        if (!callback) {
            return console.error('Callback function required');
            
        }

        if (root) {
            this.postOrder(callback, root.left)
            this.postOrder(callback, root.right)
            console.log(callback(root.data))
        }
    }

    // How many levels to a leaf node (bottom node of tree)
    height(node) {
        if (this.root == null) return

        // This is done in 2 stages were queueHeight is used to count from the node
        // to furtherst leaf node in the paths
        const queue = [this.root]

        const queueHeight = []

        // Set as -1 as leaf node will = 0
        let height = -1

        // This loop is to find the node & push that node into the queueHeight
        while (queue.length > 0) {
            const numberOfNodes = queue.length

            for (let i = 0; i < numberOfNodes; i++) {
                const frontNode = queue.shift()

                if (frontNode.data == node) {
                    queueHeight.push(frontNode)
                    break
                }

                if (frontNode.left != null) {
                    queue.push(frontNode.left)
                }

                if (frontNode.right != null) {
                    queue.push(frontNode.right)
                }

            }

        }

        // This loop is used to work out the height
        while (queueHeight.length > 0) {
            const numberOfNodes = queueHeight.length

            for (let i = 0; i < numberOfNodes; i++) {
                const frontNode = queueHeight.shift()

                if (frontNode.left != null) {
                    queueHeight.push(frontNode.left)
                }

                if (frontNode.right != null) {
                    queueHeight.push(frontNode.right)
                }
            }

            height++
        }

        // -1 means the node doesn't exist in the tree
        if (height == -1) return null

        return height

    }

    // How many levels from a node to root node (top node of tree)
    depth(node) {
        if (!this.root) return;

        // Root node is at depth 0
        let depth = 0

        const queue = [this.root]

        // WHile loop to go through all the nodes at each level & exits when there's
        // no more nodes left (i.e. last level)
        while (queue.length > 0) {

            // numberOfNodes varies each time the while loop goes through a level
            const numberOfNodes = queue.length

            // This loops for each node at that level
            for (let i = 0; i < numberOfNodes; i++) {
                const frontNode = queue.shift()
                
                if (frontNode.data == node) {
                    return depth    // depth is returned from the function
                }

                if (frontNode.left != null) {
                    queue.push(frontNode.left)
                }

                if (frontNode.right != null) {
                    queue.push(frontNode.right)
                }
            }

            // for loop finishes where the depth is incremented. If there's another,
            // level (i.e. nodes pushed into the queue), the while loop continues
            depth++
        }

        return null
        
    }

    balanceCheck(root = this.root) {
        if (root == null) return 0

        let leftHeight = this.balanceCheck(root.left)
        if (leftHeight == -1) return -1
        let rightHeight = this.balanceCheck(root.right)
        if (rightHeight == -1) return -1

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1
        } else {
            return Math.max(leftHeight, rightHeight) + 1
        }

    }

    isBalanced() {
        if (this.balanceCheck() > 0) {
            return 'Balanced'
        } else {
            return 'Not Balanced'
        }
    }

    rebalance() {
        if (!this.root) return

        const queue = [this.root]

        const data = []

        while (queue.length > 0) {
            const node = queue.shift()
            data.push(node.data)

            if (node.left) {
                queue.push(node.left)
            }

            if (node.right) {
                queue.push(node.right)
            }
        }

        this.root = this.buildTree(data)

        return data

    }

}

const array = []

function randomNumbersInArray() {
    array.push(Math.floor(Math.random() * 100))
}

randomNumbersInArray()
randomNumbersInArray()
randomNumbersInArray()
randomNumbersInArray()
randomNumbersInArray()


const balancedBST = new Tree(array)

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

prettyPrint(balancedBST.root)

function multiply(multiplier, value) {
    return value * multiplier
}

console.log(balancedBST.isBalanced())

function printNumbers(value) {
    console.log(value)
}

balancedBST.inOrder(printNumbers)
balancedBST.preOrder(printNumbers)
balancedBST.postOrder(printNumbers)