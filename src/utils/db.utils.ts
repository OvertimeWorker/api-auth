import { AsyncLocalStorage } from "node:async_hooks"
import { Prisma } from "@prisma/client"
import {
  createAutoCodeExtension,
  getSoftDeleteExtension,
} from "overtime-worker-api-utils/extensions"
import type { ExtendedDB } from "overtime-worker-api-utils/types"
import { prisma } from "~/libs/prisma.lib.js"
import { prismaModelsMetadata } from "@prisma/generated/dmmf-models/index.js"

const softDeleteExtension = getSoftDeleteExtension(prismaModelsMetadata)
const { extension: autoCodeExtension, options: _autoCodeOptions } =
  createAutoCodeExtension<Prisma.TypeMap>(prismaModelsMetadata, {})

const extendedClient = prisma.$extends(softDeleteExtension).$extends(autoCodeExtension)

type ExtendedTxClient = Parameters<Parameters<(typeof extendedClient)["$transaction"]>[0]>[0]

// Initialize AsyncLocalStorage
const txStorage = new AsyncLocalStorage<ExtendedTxClient>()

// Initialize the db context
const db = new Proxy(extendedClient, {
  get(target, prop, receiver) {
    const txClient = txStorage.getStore()

    // Use the transaction if exists, otherwise use extended client
    return Reflect.get(txClient ?? target, prop, receiver)
  },
}) as unknown as ExtendedDB<
  Prisma.TypeMap,
  typeof extendedClient,
  Extract<keyof typeof _autoCodeOptions, string>
>

// Wraps operations in a transaction and propagates it via AsyncLocalStorage
async function runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
  return await extendedClient.$transaction(async (tx) => {
    return await txStorage.run(tx, fn)
  })
}

export { extendedClient, db, runInTransaction }
