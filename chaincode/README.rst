CPU USE TRACKER WITH FABRIC SHIM
================================

Low level fabric framework used to build smart contracts

Vendoring
---------

To make sure that we have all  the resources run

.. code:: bash

    GO111MODULE=on go mod vendor


Building
--------

To get the ``build`` command to use the vendor folder

.. code:: bash
  
    go build -mod vendor -o cpu


